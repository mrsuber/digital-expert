import {useState, useEffect} from 'react'
import axios from 'axios'
// import {Posts,Pagination} from './component'
import {Posts,Pagination} from '../../../components'
import './table.css'
import {data2} from '../../../data/data'





const Table = () => {
  const [posts, setPosts] = useState([]);
  const [loading,setLoading] = useState(false)
  const [currentPage,setCurrentPage] =useState(1)
  const [postsPerPage] = useState(10)



  useEffect(() =>{
    const fetchPost = async () => {
      setLoading(true);
      const res = await axios.get('https://jsonplaceholder.typicode.com/posts')

      setPosts(res.data)
      setLoading(false);
    }

    fetchPost()
  },[])



//get current posts
const indexOfLastPost = currentPage * postsPerPage
const indexOfFirstPost = indexOfLastPost-postsPerPage
const currentPosts = posts.slice(indexOfFirstPost,indexOfLastPost);


// change page
const paginate = (pageNumber) => setCurrentPage(pageNumber)
  return (
    <div className="table__constainer">
    <h1 className=" table__title">My Blog</h1>
    <Posts posts={currentPosts} loading={loading}/>

    <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate} />

    </div>
  )
}

export default Table
