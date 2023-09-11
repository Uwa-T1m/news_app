const Card = ({children, className}) => {
  return (
    <div className={`shadow-md p-5 rounded-lg bg-white  my-1 ${className}`}>
        {children}
    </div>
  )
}

export default Card