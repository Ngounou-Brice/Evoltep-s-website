from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
import json
import os
from werkzeug.utils import secure_filename

# EMAIL IMPORTS
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv

# LOAD ENV
load_dotenv()

app = Flask(__name__)
CORS(app)

# ---------------- CONFIG ---------------- #
DATA_FILE = "data.json"
UPLOAD_FOLDER = "uploads"
ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "gif"}

app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

EMAIL_USER = os.getenv("EMAIL_USER")
EMAIL_PASS = os.getenv("EMAIL_PASS")

# ---------------- DEFAULT DATA ---------------- #
default_data = {
    "heroTitle": "We Build Powerful Digital Solutions",
    "heroBg": "",
    "projects": [
        {
            "id": 1,
            "title": "Project One",
            "description": "This is an example project.",
            "image": "/uploads/default-project.png",
            "category": "Web Development",
            "year": 2026,
            "link": ""
        }
    ]
}

# ---------------- LOAD DATA ---------------- #
if os.path.exists(DATA_FILE):
    try:
        with open(DATA_FILE, "r") as f:
            data = json.load(f)
    except:
        data = default_data
else:
    data = default_data

# Save initial file if not exists
with open(DATA_FILE, "w") as f:
    json.dump(data, f, indent=4)

# ---------------- HELPERS ---------------- #
def save_data():
    with open(DATA_FILE, "w") as f:
        json.dump(data, f, indent=4)

def get_next_project_id():
    if data["projects"]:
        return max(p["id"] for p in data["projects"]) + 1
    return 1

def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

# ---------------- ROUTES ---------------- #

# GET all data
@app.route("/api/data", methods=["GET"])
def get_data():
    return jsonify(data)

# ---------------- HERO ---------------- #
@app.route("/api/hero", methods=["POST"])
def update_hero():
    file = request.files.get("heroBg")

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config["UPLOAD_FOLDER"], filename))
        data["heroBg"] = f"/{UPLOAD_FOLDER}/{filename}"

    new_title = request.form.get("heroTitle")
    if new_title:
        data["heroTitle"] = new_title

    save_data()
    return jsonify({"success": True})

# ---------------- PROJECTS ---------------- #

# ADD PROJECT
@app.route("/api/projects", methods=["POST"])
def add_project():
    project = request.form.to_dict()

    if not project.get("title"):
        return jsonify({"success": False, "error": "Title required"}), 400

    # Handle year
    project["year"] = int(project.get("year", 2026))

    # NEW: project link
    project["link"] = project.get("link", "")

    # Handle image
    file = request.files.get("image")
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config["UPLOAD_FOLDER"], filename))
        project["image"] = f"/{UPLOAD_FOLDER}/{filename}"
    else:
        project["image"] = "/uploads/default-project.png"

    project["id"] = get_next_project_id()
    project.setdefault("description", "")
    project.setdefault("category", "General")

    data["projects"].append(project)
    save_data()

    return jsonify({"success": True, "project": project})


# UPDATE PROJECT
@app.route("/api/projects/<int:project_id>", methods=["PUT"])
def update_project(project_id):
    project = next((p for p in data["projects"] if p["id"] == project_id), None)

    if not project:
        return jsonify({"success": False, "error": "Not found"}), 404

    updates = request.form.to_dict()

    for field in ["title", "description", "category", "year", "link"]:
        if field in updates:
            project[field] = int(updates[field]) if field == "year" else updates[field]

    # Handle image
    file = request.files.get("image")
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config["UPLOAD_FOLDER"], filename))
        project["image"] = f"/{UPLOAD_FOLDER}/{filename}"

    save_data()
    return jsonify({"success": True, "project": project})


# DELETE PROJECT
@app.route("/api/projects/<int:project_id>", methods=["DELETE"])
def delete_project(project_id):
    project = next((p for p in data["projects"] if p["id"] == project_id), None)

    if not project:
        return jsonify({"success": False}), 404

    data["projects"].remove(project)
    save_data()

    return jsonify({"success": True})


# ---------------- CONTACT (EMAIL) ---------------- #
@app.route("/api/contact", methods=["POST"])
def send_email():
    data_req = request.json

    name = data_req.get("name")
    email = data_req.get("email")
    phone = data_req.get("phone")
    message = data_req.get("message")

    if not name or not email or not message:
        return jsonify({"success": False, "error": "Missing fields"}), 400

    try:
        msg = MIMEMultipart()
        msg["From"] = EMAIL_USER
        msg["To"] = EMAIL_USER
        msg["Subject"] = f"New Message from {name}"

        body = f"""
New Project Request 🚀

Name: {name}
Email: {email}
Phone: {phone}

Message:
{message}
        """

        msg.attach(MIMEText(body, "plain"))

        server = smtplib.SMTP("smtp.gmail.com", 587)
        server.starttls()
        server.login(EMAIL_USER, EMAIL_PASS)
        server.sendmail(EMAIL_USER, EMAIL_USER, msg.as_string())
        server.quit()

        return jsonify({"success": True})

    except Exception as e:
        print("EMAIL ERROR:", e)
        return jsonify({"success": False}), 500


# ---------------- SERVE IMAGES ---------------- #
@app.route("/uploads/<filename>")
def uploaded_file(filename):
    return send_from_directory(app.config["UPLOAD_FOLDER"], filename)


# ---------------- RUN ---------------- #
if __name__ == "__main__":
    app.run(debug=True)