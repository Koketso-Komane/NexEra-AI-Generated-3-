from flask import Flask, render_template, request, jsonify
import os

app = Flask(__name__)
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route("/")
def home():
    return render_template("index.html")

# ---------------- TEST 1 ----------------
@app.route("/api/test1", methods=["POST"])
def test1():
    text = request.form.get("text", "").lower()
    image = request.files.get("image")

    if image:
        image.save(os.path.join(UPLOAD_FOLDER, image.filename))

    if "helmet" in text:
        return jsonify({
            "model": "https://modelviewer.dev/shared-assets/models/Astronaut.glb",
            "reasoning": "AI detected a safety helmet from the description/image.",
            "education": "Safety helmets protect workers from head injuries in hazardous environments."
        })

    if "fire" in text:
        return jsonify({
            "model": "https://modelviewer.dev/shared-assets/models/RobotExpressive.glb",
            "reasoning": "AI detected fire safety equipment.",
            "education": "Fire extinguishers are used to control small fires during emergencies."
        })

    return jsonify({
        "model": "https://modelviewer.dev/shared-assets/models/MetalRoughSpheres.glb",
        "reasoning": "AI inferred a generic training object.",
        "education": "This object is used in professional training scenarios."
    })

# ---------------- TEST 2 ----------------
@app.route("/api/test2", methods=["POST"])
def test2():
    command = request.json["command"].lower()

    if "wave" in command:
        return jsonify({"action":"wave","explanation":"Avatar waves to greet the learner."})
    if "walk" in command:
        return jsonify({"action":"walk","explanation":"Avatar walks to demonstrate movement."})
    if "point" in command:
        return jsonify({"action":"point","explanation":"Avatar points to highlight an object."})

    return jsonify({"action":"idle","explanation":"Avatar is idle awaiting instruction."})

if __name__ == "__main__":
    app.run(debug=True)
