import { BsNewspaper } from 'react-icons/bs'
import { useState, useEffect } from 'react';
import { Categories, Countries } from '../constants'
import { Card, Footer } from '../components'

const HomePage = () => {
    const [country, setCountry] = useState('ng')
    const [category, setCategory] = useState('general')
    const [newsData, setNewsData] = useState([])
    const [searchQuery, setSearchQuery] = useState('')


    const fetchNews = () => {
        const apiKey = process.env.REACT_APP_NEWS_APP_API_KEY;
        let apiUrl = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}`

        if (searchQuery.trim() !== '') {
            apiUrl = `https://newsapi.org/v2/everything?q=${searchQuery}`
        }

        fetch(apiUrl, {
            method: 'GET',
            headers: {
                'X-Api-Key': apiKey,
            }
        }).then((res) => res.json())
            .then((data) => setNewsData(data.articles))
            .catch((err) => console.log(`[ERROR]: ${err}`))
    }

    useEffect(() => {

        const timeId = setTimeout(() => {
            fetchNews()
        }, 500);

        return () => {
            clearTimeout(timeId)
        }
        // eslint-disable-next-line
    }, [country, category, searchQuery])


    const otherNews = newsData.slice(4)

    return (
        <main className="bg-gray-100 relative min-h-screen w-full">
            <div className='z-10 sticky top-0 w-full'>
                <nav className="w-full p-4 bg-white shadow-md flex items-center justify-between mb-3">
                    <div className="flex gap-4 items-center">
                        <h3 className="font-bold text-xl">Logo</h3>
                    </div>
                    <ul className="flex items-center gap-3">
                        <select value={country} onChange={e => setCountry(e.target.value)}>
                            {Countries.map(country => (
                                <option key={country.code} value={country.code}>{country.label}</option>
                            ))}
                        </select>
                        <select value={category} onChange={e => setCategory(e.target.value)}>
                            {
                                Categories.map(category => (
                                    <option value={category.value} key={category.value}>{category.label}</option>
                                ))
                            }
                        </select>
                    </ul>
                </nav>
            </div>
                                <div className='flex items-center m-auto w-[90%] justify-between bg-white p-3 gap-1 rounded-xl'>
                                    <input
                                        type="text"
                                        className='bg-transparent outline-none w-3/4'
                                        placeholder='Search'
                                        value={searchQuery}
                                        onChange={e => setSearchQuery(e.target.value)}
                                    />
                                </div>
            <div className='min-h-screen w-full relative'>
                {
                    searchQuery ? (
                    <div>
                        {
                            newsData.length > 0 ? (
                            <>
                            <h2>Showing results for {searchQuery}</h2>
                                {
                                    newsData.map(article => (
                                        <Card className='w-[80%] h-auto m-auto mt-4'>
                                            <a 
                                            href={article.url} 
                                            className='flex gap-3 items-center m-auto'
                                            target='_blank'
                                            rel='noreferrer'
                                            >
                                            <img src={article.urlToImage} className='w-48 h-32 rounded-md' alt={article.title} />
                                            <h4 className='truncate font-medium'>{article.title}</h4>
                                            </a>
                                        </Card>
                                    ))
                                }
                            </>
                            ) : (
                            <div>
                                <p>No results found for {searchQuery}</p>
                            </div>
                            )
                        }
                    </div>
                    ) : (
                    <>
                        {newsData.length > 0 ? (
                            <>
                                <h1 className='font-bold py-3 text-4xl text-gray-500'>Top Headlines</h1>
                                <section className='flex flex-col md:flex-row gap-2 w-full'>
                                    <a href={newsData[0].url} className="md:w-2/3  w-full md:mx-4 mx-0" target="_blank" rel='noreferrer'>
                                        <Card className='w-full'>
                                            {
                                                newsData[0].urlToImage == null ? (
                                                    <div className="w-full rounded-lg flex items-center justify-center bg-gray-100 h-[14.5rem] text-5xl"><BsNewspaper /></div>
                                                ) : (

                                                    <img src={newsData[0].urlToImage} alt="" className="w-full rounded-lg" height={300} width={400} />
                                                )
                                            }

                                            <h1 className="truncate text-xl font-bold">{newsData[0].title}</h1>
                                        </Card>
                                    </a>
                                    <div className='md:w-1/3 w-full md:justify-center overflow-x-auto gap-3 flex flex-col'>
                                        {/* <div className="w-full flex items-center flex-col justify-between"> */}
                                        <a href={newsData[1].url} className='flex items-center gap-1' target="_blank" rel='noreferrer'>
                                            {
                                                newsData[1].urlToImage == null
                                                    ? (<div className="w-16 rounded-lg flex items-center justify-center bg-gray-100 h-16 text-2xl"><BsNewspaper /></div>)
                                                    :
                                                    <img src={newsData[1].urlToImage} alt="" className="w-32 h-16 rounded-lg" />
                                            }
                                            <h1 className="truncate text-md font-bold">{newsData[1].title}</h1>
                                        </a>
                                        <a href={newsData[2].url} className='flex items-center gap-1' target="_blank" rel='noreferrer'>
                                            {
                                                newsData[2].urlToImage == null
                                                    ? (<div className="w-16 rounded-lg flex items-center justify-center bg-gray-100 h-16 text-2xl"><BsNewspaper /></div>)
                                                    :
                                                    <img src={newsData[2].urlToImage} alt="" className="w-32 h-16 rounded-lg" />
                                            }
                                            <h1 className="truncate text-md font-bold">{newsData[2].title}</h1>
                                        </a>
                                        <a href={newsData[3].url} className='flex items-center gap-1' target="_blank" rel='noreferrer'>

                                            {
                                                newsData[3].urlToImage == null
                                                    ? (<div className="w-16 rounded-lg flex items-center justify-center bg-gray-100 h-16 text-2xl"><BsNewspaper /></div>)
                                                    :
                                                    <img src={newsData[3].urlToImage} alt="" className="w-32 h-16 rounded-lg" />
                                            }
                                            <h1 className="truncate text-md font-bold">{newsData[3].title}</h1>
                                        </a>
                                    </div>
                                </section>
                                <hr className="my-6 h-1 bg-gray-300" />
                                <div className="w-full gap-3 grid md:grid-cols-3 grid-cols-1 mt-5">
                                    {
                                        otherNews.map((article, index) => (
                                            <Card className='h-auto' key={index}>
                                                <a
                                                    href={article.url}
                                                    target="_blank"
                                                    className="flex md:flex-col flex-row text-center items-center w-full gap-2"
                                                    rel='noreferrer'>
                                                    <div className='md:w-full w-max m-auto'>
                                                        {
                                                            article.urlToImage == null
                                                                ? (<div className="w-32 md:w-full rounded-lg flex items-center justify-center bg-gray-100 h-16 md:h-[14.5rem] text-2xl md:text-5xl"><BsNewspaper /></div>)
                                                                :
                                                                <img src={article.urlToImage} alt="" className="md:w-full w-36 h-16 rounded-lg object-cover md:h-[14.5rem]" />
                                                        }
                                                    </div>
                                                    <span className="w-3/4 md:w-full overflow-hidden">
                                                        <h3 className='truncate font-medium text-sm'>{article.title}</h3>
                                                    </span>
                                                </a>
                                            </Card>
                                        ))
                                    }
                                </div>
                            </>
                        ) : (
                        <div className="w-full h-screen fixed top-0 left-0 z-[100000] gap-4 flex items-center justify-center flex-col bg-white/10">
                            <div className='h-56 w-56 rounded-full border-[15px] border-t-gray-500 animate-spin'></div>
                        <p className='text-xl font-medium'>Loading ...</p>
                        </div>
                        )}
                    </>)
                }
            </div>
            <div className='w-full m-auto my-2'><Footer /></div>
        </main>
    )
}

export default HomePage;