const targetDate = new Date("2026-02-06T23:00:00"); 

function updateCountdown() {
  const now = new Date();
  const diff = targetDate - now;
  const tripenddate = new Date("2026-02-15T20:00:00"); 

  if (now <= tripenddate && now >= targetDate) {
    document.getElementById("timer").textContent = "Together Again!!! HYPE HYPE HYPE!!!! Yayyyyy!!! 💖";
    return;
  }
  if (now < targetDate) {
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / (1000 * 60)) % 360);
    document.getElementById("timer").innerHTML = `Almost there !!! 🔜<br>${days} days · ${hours} hours · ${minutes} minutes · ${seconds} seconds`;
    return;
  }
  if (now > tripenddate) {
    document.getElementById("timer").textContent = "Will see you again !!! 🔜";
    return;
  }

}

setInterval(updateCountdown, 1000);
updateCountdown();
