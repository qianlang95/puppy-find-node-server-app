
  const comments = [
    {
        id: 1,
        author: "Sam",
        authorProfile: "xxxx",
        description: "This is a cute puppy1!",
        postId:5
      },
      {
        id: 2,
        author: "Jay",
        authorProfile: "xxxx",
        description: "This is a cute puppy2!",
        postId:3
      },
      {
        id: 3,
        author: "Bob",
        authorProfile: "xxxx",
        description: "This is a cute puppy3!",
        postId:3
      }
  ];
  
  


const Comment = (app) => {

    app.get("/comments", (req, res) => {

        res.json(comments);
      });

    app.get("/comments/:postId", (req, res) => {
        const { postId } = req.params;
        const commentsByPostId = comments.filter((t) => t.postId === parseInt(postId));
        res.json(commentsByPostId);
      });



    app.post("/comments", (req, res) => {
        const newComment = {
          ...req.body,
          id: new Date().getTime(),
        };
        comments.push(newComment);
        res.json(newComment);
      });


      

    app.delete("/comments/:commentId", (req, res) => {
        const { commentId } = req.params;
        console.log(commentId,"***************");
        const commnetTartet = comments.find((t) => t.id === parseInt(commentId));
        if (!commnetTartet) {
            res
              .status(404)
              .json({ message:
                `Unable to delete comment with ID ${commentId}` });
            return;
          }
      
        comments.splice(comments.indexOf(commnetTartet), 1);
        res.sendStatus(200);
      });
    


    // app.put("/a5/todos/:id", (req, res) => {
    //     const { id } = req.params;
    //     const todo = todos.find((t) => t.id === parseInt(id));
    //     if (!todo) {
    //         res
    //           .status(404)
    //           .json({ message:
    //             `Unable to update Todo with ID ${id}` });
    //         return;
    //       }
      
    //     todo.title = req.body.title;
    //     todo.description = req.body.description;
    //     todo.due = req.body.due;
    //     todo.completed = req.body.completed;
    //     res.sendStatus(200);
    //   });
    

    
  };
  export default Comment;