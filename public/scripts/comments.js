const loadCommentsBtnElement = document.getElementById('load-comments-btn');
const commentsSectionElement = document.getElementById('comments');

function createCommentList(comments) {
  const commentListElement = document.createElement('ol');

  for (const comment of comments) {
    const commentElement = document.createElement('li');
    commentElement.innerHTML = `
      <article class="comment-item">
        <h2>${comment.title}</h2>
        <p>${comment.text}</p>
      </article>
    `;
    commentListElement.appendChild(commentElement);
  }

  return commentListElement;
}

async function fetchCommentsForPost() {
  const postId = loadCommentsBtnElement.dataset.postid;
  const response = await fetch(`/posts/${postId}/comments`);
  const responseData = await response.json();

  const commentListElement = createCommentList(responseData);
  commentsSectionElement.innerHTML = '';
  commentsSectionElement.appendChild(commentListElement);
}

loadCommentsBtnElement.addEventListener('click', fetchCommentsForPost);
