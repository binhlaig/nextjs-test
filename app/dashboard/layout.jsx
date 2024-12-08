import Navbar from "../ui/Navbar/navbar"

const layout = ({children}) => {
  return (
    <div>
        <Navbar/>
        {children}
        
    </div>
  )
}

export default layout
