document.querySelectorAll('.action-bar-item').forEach(item => {
    item.addEventListener('click', function() {
        const url = this.getAttribute('data-href');
        const filename = this.getAttribute('data-filename');

        if (filename) {
            // If a filename is provided, create an anchor for downloading
            const link = document.createElement('a');
            link.href = url;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else if (url) {
            // If no filename, assume it's a normal URL redirection
            window.location.href = url;
        }
    });
});
