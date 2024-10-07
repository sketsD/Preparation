document.addEventListener("DOMContentLoaded", function () {
  const commentForm = document.getElementById("commentForm");
  const commentsList = document.getElementById("commentsList");
  const commentInput = document.getElementById("commentInput");

  let comments = JSON.parse(localStorage.getItem("comments")) || [];

  function renderComments(comments, parentElement) {
    parentElement.innerHTML = "";
    comments.forEach((comment) => {
      const commentElement = createCommentElement(comment);
      parentElement.appendChild(commentElement);
    });
  }

  function createCommentElement(comment) {
    const li = document.createElement("li");
    li.classList.add("comment");
    li.innerHTML = `
        <p>${comment.text}</p>
        <span>${new Date(comment.timestamp).toLocaleString()}</span>
        <button class="reply-btn">Reply</button>
        <button class="delete-btn">Delete</button>
      `;

    const replyForm = document.createElement("form");
    replyForm.classList.add("reply-form");
    replyForm.innerHTML = `
        <textarea placeholder="Your text..."></textarea>
        <button type="submit">Reply</button>
      `;
    replyForm.style.display = "none";
    li.appendChild(replyForm);

    const repliesList = document.createElement("ul");
    li.appendChild(repliesList);
    if (comment.replies.length > 0) {
      renderComments(comment.replies, repliesList);
    }

    const replyButton = li.querySelector(".reply-btn");
    replyButton.addEventListener("click", () => {
      replyForm.style.display =
        replyForm.style.display === "none" ? "block" : "none";
    });

    replyForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const replyText = replyForm.querySelector("textarea").value;
      if (replyText) {
        comment.replies.push({
          text: replyText,
          timestamp: Date.now(),
          replies: [],
        });
        saveComments();
        renderComments(comments, commentsList);
      }
    });

    const deleteButton = li.querySelector(".delete-btn");
    deleteButton.addEventListener("click", () => {
      deleteComment(comments, comment);
      saveComments();
      renderComments(comments, commentsList);
    });

    return li;
  }

  commentForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const newComment = {
      text: commentInput.value,
      timestamp: Date.now(),
      replies: [],
    };
    comments.push(newComment);
    saveComments();
    renderComments(comments, commentsList);
    commentInput.value = "";
  });

  function saveComments() {
    localStorage.setItem("comments", JSON.stringify(comments));
  }

  function deleteComment(commentsArray, commentToDelete) {
    const index = commentsArray.indexOf(commentToDelete);
    console.log(commentsArray);
    console.log(commentToDelete);
    console.log(index);
    if (index !== -1) {
      commentsArray.splice(index, 1);
    } else {
      commentsArray.forEach((comment) => {
        if (comment.replies.length > 0) {
          deleteComment(comment.replies, commentToDelete);
        }
      });
    }
  }

  renderComments(comments, commentsList);
});
