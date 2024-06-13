import UserHeader from "../Components/UserHeader"
import UserPost from "../Components/UserPost"

function Userpage() {
  return (
    <>
    <UserHeader/>
    <UserPost like={1200} replies={401} postImg='/post1.png' postTitle="Mark Zuckerberg"/>
    <UserPost like={125} replies={85} postImg='/post2.png' postTitle="Dan Abramov"/>
    <UserPost like={150} replies={100} postImg='/post3.png' postTitle="Albert Einstein"/>
    <UserPost like={1450} replies={825} postImg='/post4.png' postTitle="Sagar Seth"/>
    </>
  )
}

export default Userpage