fetch("http://my-json-server.typicode.com/typicode/demo/posts")
  .then(response => response.json())
  .then(json => {
    json.map((x, index) => {
      let ul = document.getElementById("myBlogs");
      let lists = document.getElementsByTagName("li");
      lists[x.id - 1].innerHTML = "Id " + x.id + "<br>" + x.title;
      let btn = document.createElement("BUTTON");
      btn.innerHTML = "show comments";
      lists[x.id - 1].appendChild(btn);
      btn.setAttribute("id", `button-${index}`);
      btn.classList.add("button");
      document.getElementById("loader").style.display = "none";
      document.getElementById("blogs").style.display = "block";
      btn.addEventListener(
        "click",
        (showComment = event => {
          fetch(" https://my-json-server.typicode.com/typicode/demo/comments")
            .then(response1 => response1.json())
            .then(json1 => {
              let para = document.createElement("p");

              json1.map((y, yindex) => {
                if (x.id == y.postId) {
                  para.innerHTML =
                    "<br>Comment: " + y.body + "<br> PostId: " + y.postId;
                  document.getElementById(`button-${index}`).disabled = true;
                } else {
                  para.innerHTML = "No comments to show";
                  document.getElementById(`button-${index}`).disabled = true;
                }
                lists[index].appendChild(para);
              });
            });
        })
      );
    });
  })
  .catch(err => console.log(err));
