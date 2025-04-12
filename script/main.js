/** @format */

document.addEventListener('DOMContentLoaded', () => {
    const mainVideo = document.getElementById('mainVideo');
    const videoWords = document.querySelectorAll('.video-word');

    videoWords.forEach((container) => {
        const canvas = document.createElement('canvas');
        container.appendChild(canvas);
        const ctx = canvas.getContext('2d');

        container.canvas = canvas;
        container.ctx = ctx;
    });

    mainVideo.addEventListener('loadeddata', () => {
        mainVideo.play();
        const updateCanvasSizes = () => {
            videoWords.forEach((container) => {
                const rect = container.getBoundingClientRect();
                container.canvas.width = rect.width;
                container.canvas.height = rect.height;
            });
        };
        window.addEventListener('resize', updateCanvasSizes);
        updateCanvasSizes();

        const draw = () => {
            videoWords.forEach((container) => {
                const x = parseInt(container.dataset.x) || 0;

                const width = container.canvas.width;
                const height = container.canvas.height;

                container.ctx.drawImage(
                    mainVideo,
                    x,
                    0,
                    width,
                    height,
                    0,
                    0,
                    width,
                    height
                );
            });
            requestAnimationFrame(draw);
        };
        draw();
    });
});
