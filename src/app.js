document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('submit-btn').addEventListener('click', submitPost);
});

function submitPost() {
    const twitter = document.getElementById('twitter').checked;
    const postText = document.getElementById('post-text').value;
    const postImage = document.getElementById('post-image').files[0];

    if (twitter) {
        const twitterWindow = window.open('https://twitter.com/intent/tweet', 'twitter', 'width=600,height=400');
        twitterWindow.onload = function() {
            twitterWindow.document.getElementById('status').value = postText;
            if (postImage) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const image = e.target.result;
                    twitterWindow.document.getElementById('media').value = image;
                };
                reader.readAsDataURL(postImage);
            }
        };
    }
}