import React from "react";
import Container from "../component/ExtraComp/Container";
import CreatePost from "../component/Post/CreatePost";

function AddPost(){
    return(
        <div>
          <Container>
            <CreatePost/>
          </Container>
        </div>
    )
}

export default AddPost