const Navbar = () =>{
    return(
        <nav className="w-full p-4 bg-white shadow-md flex items-center justify-between mb-3">
<div className="flex gap-4 items-center">
<h3 className="font-bold text-xl">Logo</h3>
</div>
<ul className="flex items-center gap-3">
<li className="uppercase font-semibold">Home</li>
<li className="uppercase">Blog</li>
<li className="uppercase">bookMarks</li>
</ul>
        </nav>
    )
}

export default Navbar