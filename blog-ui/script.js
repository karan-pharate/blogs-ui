fetch("http://my-json-server.typicode.com/typicode/demo/posts")
  .then(response => response.json())
  .then(json => {
    json.map(x => {
      let ul = document.getElementById("myBlogs");
      let lists = document.getElementsByTagName("li");
      lists[x.id - 1].innerHTML = "Id " + x.id + "<br>" + x.title;
      let btn = document.createElement("BUTTON");
      btn.innerHTML = "show comments";
      lists[x.id - 1].appendChild(btn);
      btn.setAttribute("id", "buttonid");
      document.getElementById("loader").style.display = "none";
      document.getElementById("blogs").style.display = "block";
      btn.addEventListener(
        "click",
        (showComment = () => {
          fetch(" https://my-json-server.typicode.com/typicode/demo/comments")
            .then(response1 => response1.json())
            .then(json1 => {
              json1.map(y => {
                let para = document.createElement("p");
                if (x.id == y.id) {
                  para.innerHTML =
                    "Comment Id: " +
                    y.id +
                    "<br>Comment: " +
                    y.body +
                    "<br> PostId: " +
                    y.postId;
                  lists[y.id - 1].appendChild(para);
                }
              });
            });
        })
      );
    });
  })
  .catch(err => console.log(err));
