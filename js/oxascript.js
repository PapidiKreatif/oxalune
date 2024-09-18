function createCountdown(elementId, endDate, cardElement) {
    const countdownElement = document.getElementById(elementId);

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = new Date(endDate).getTime() - now;

        if (distance >= 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24))
                .toString()
                .padStart(2, "0");
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
                .toString()
                .padStart(2, "0");
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
                .toString()
                .padStart(2, "0");
            const seconds = Math.floor((distance % (1000 * 60)) / 1000)
                .toString()
                .padStart(2, "0");

            countdownElement.innerHTML = `${days} : ${hours} : ${minutes} : ${seconds}`;
        } else {
            countdownElement.innerHTML = "<span class='text-danger fw-bold'>Expired</span>";
            cardElement.classList.add("disabled-card");
        }
    }

    // Update countdown setiap detik
    setInterval(updateCountdown, 1000);
    updateCountdown(); // Menjalankan sekali untuk update pertama kali
}

function initializeCountdowns(countdownData) {
    countdownData.forEach(item => {
        const cardElement = document.getElementById(item.elementId).closest('.card');
        createCountdown(item.elementId, item.endDate, cardElement);
    });
}

// Mengambil JSON dari file
document.addEventListener('DOMContentLoaded', () => {
    fetch('js/oxajs.json')
        .then(response => response.json())
        .then(data => {
            initializeCountdowns(data);
        })
        .catch(error => console.error('Error fetching the JSON:', error));
});
