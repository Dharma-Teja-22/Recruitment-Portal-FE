import Mybutton from "@/button/Mybutton"
import Header from "./Header"


function Home(): JSX.Element {

  return (
    
    <div>
        <div className="absolute opacity-30 bg-black h-full w-full"></div>
        <div className="absolute pt-52">
        <h1 className="justify-start pl-32 text-8xl font-medium text-white">
          We’re Hiring!
        </h1>
        <p className="justify-start pl-36 pr-36 text-justify pt-10 font-medium text-white">
          Are you ready to take your career to the next level? 
          Join our innovative team and contribute to exciting projects in a collaborative environment. We’re seeking passionate, motivated individuals who
          thrive on challenges and growth. Apply now to become a key player in our success story!
        </p>
        
        <Mybutton data={"Learn More"} url="https://miraclesoft.com/"></Mybutton>
    </div>
    <Header></Header>
    <img className="h-screen  w-screen" src="https://www.forbes.com/advisor/wp-content/uploads/2022/03/Best_Recruiting_Software_-_article_image.jpg"/>
    {/* {<ul>
      {candidates.map((candidate) => (
        <li>
          {candidate.candidate_id} - {candidate.first_name}  {candidate.last_name} - {candidate.email}
        </li>
      ))}
    </ul>} */}
    </div>
  )
}

export default Home