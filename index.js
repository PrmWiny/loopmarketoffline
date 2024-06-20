body {
  font-family: 'Montserrat', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow: hidden;
  background-color: #535353;
}

.container {
  display: flex;
  gap: 20px;
  background-color: #3b3b3b;
  padding: 25px;
  border-radius: 25px;
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.1);
  width: 580px;
  height: 512px;
}
.form-group {
  margin-bottom: 15px;
}
.form-group label {
  display: block;
  margin-bottom: 0px;
}
.form-group input,
.form-group button {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}
.button-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.button-group button {
  width: auto;
  padding: 12px 10px;
  margin-right: 10px;
  border: none;
  cursor: pointer;
  background-color: #595959;
  color: white;
  border-radius: 20px;
  transition: background-color 0.3s ease;
}
.button-group button:hover {
  background-color: #1d3920;
}
.button-group button.active {
  background-color: #4caf50;
  color: rgb(255, 255, 255);
  animation: blink 2s infinite;
}

@keyframes blink {
  0%,
  100% {
    background-color: #4caf50;
  }
  50% {
    background-color: #60e064;
  }
}
.result-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.result {
  padding: 10px;
  background-color: #c7c7c7;
  border: 1px solid #c7c7c7;
  border-radius: 15px;

  text-align: start;
  width: 322px;
  height: 134px;
}
.result-item {
  margin-top: 5px;
  margin-bottom: 10px;
  text-wrap: stable;
  text-align: Start;
  font-family: 'Alvina_Demo', sans-serif;
  font-size: 16.5px;
  color: #000000; /* สีเขียวแบบนาฬิกาดิจิตอล */
  text-align: left;
}

@font-face {
  font-family: 'Digital-7';
  src: url('fonts/Alvina_Demo.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}
.result-item button {
  margin-left: 3px;
  cursor: pointer;
  width: auto;
  padding: 2px 10px;
  margin-right: 10px;
  border: none;
  cursor: pointer;
  background-color: #b52727;
  color: white;
  border-radius: 20px;
  transition: background-color 0.3s ease;
}

.result-item button:hover {
  background-color: #c82d2d;
}

.button-group1 {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.button-group1 button {
  width: auto;
  padding: 10px 20px;
  margin-right: 10px;
  border: none;
  cursor: pointer;
  background-color: #008b2c;
  color: white;
  border-radius: 20px;
  transition: background-color 0.3s ease;
}
.button-group1 button:hover {
  background-color: #016c23;
}
.button-group2 {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.button-group2 button {
  width: auto;
  padding: 10px 20px;
  margin-right: 10px;
  border: none;
  cursor: pointer;
  background-color: #893434;
  color: white;
  border-radius: 20px;
  transition: background-color 0.3s ease;
}
.form-group input {
  margin-top: 80px;
  padding: 10px;
  width: 97%;
  box-sizing: border-box;
  border: 2px solid #917d4a;
  color: white;
  padding-left: 31%;
  background-color: #917d4a;
  border-radius: 20px;
  font-size: 16px;
  transition: background-color 0.3s ease;
  transition: border 0.3s ease;
}
.form-group input:hover {
  background-color: #5b4f30;
  border: 2px solid #5b4f30;
}
.button-group2 button:hover {
  background-color: #917d4a;
}

.button-groupC {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.button-groupC button {
  width: auto;
  padding: 10px 20px;
  margin-right: 10px;
  border: none;
  cursor: pointer;
  background-color: #0e62a7;
  color: white;
  border-radius: 20px;
  transition: background-color 0.3s ease;
}
.button-groupC button:hover {
  background-color: #2a5b76;
}

/* styles.css */

/* Toggle button styles */
.switch {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
  margin-left: 0px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #bf5c5c;
  transition: 0.2s;
  border-radius: 20px;
}

.slider:before {
  position: absolute;
  content: '';
  height: 12px;
  width: 12px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #00b972;
}

input:checked + .slider:before {
  transform: translateX(20px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 20px;
}

.slider.round:before {
  border-radius: 50%;
}
