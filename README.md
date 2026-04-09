# 🚁 Supply Mission Game

A fun physics-based mini game where you control a helicopter and drop supply packages onto target zones 🎯 using **p5.js** and **Matter.js**.

---

## 🎮 Gameplay

- Control the helicopter using arrow keys  
- Press **SPACE** to drop the package  
- Try to land it exactly on the **red X mark**  
- Deliver all packages successfully to complete the mission  

---

## ✨ Features

- 🚁 Smooth helicopter movement  
- 📦 Realistic package drop using physics (Matter.js)  
- 🎯 Random target location every round  
- 🔁 Continuous package generation  
- 🧮 Live score tracking  
- 🎯 Random mission goals (e.g., deliver 3–5 packages)  
- ❌ Mission Failed screen (if drop is inaccurate)  
- ✅ Mission Accomplished screen (when goal is reached)  
- 🔄 Restart functionality  

---

## 🕹 Controls

| Key | Action |
|-----|--------|
| ⬅️ ➡️ ⬆️ ⬇️ | Move helicopter |
| SPACE | Drop package |
| R | Restart game |

---

## 🧠 Game Logic

- Package follows helicopter until dropped  
- Once dropped:
  - Falls straight down
  - Distance from target is calculated  
- If within drop zone → ✅ score increases  
- Else → ❌ mission fails  

---

## 🖼️ Tech Stack

- **p5.js** → rendering & sprites  
- **Matter.js** → physics engine  

---

## 📂 Project Structure

```
project-folder/
│
├── index.html
├── sketch.js
├── helicopter.png
├── package.png
└── README.md
```

---

## 🚀 How to Run

1. Download or clone the repo  
2. Open `index.html` in your browser  
3. Play 🎮  

---

## 💡 Future Improvements

- 🔊 Sound effects (drop, success, fail)  
- 🌍 Multiple levels / increasing difficulty  
- ⏱ Timer-based missions  
- 🎯 Smaller target zones for higher levels  
- 🎨 Better UI & animations  

---

## 🏁 Goal

Deliver all packages accurately and complete the mission without failing!
