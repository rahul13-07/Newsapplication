import React, { useState, useEffect } from 'react'
import Loader from './Loader';
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {


    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)

    // document.title = `${this.capitalizeFirstLetter(props.category)} - NewsMonkey`

    const capitalizeFirstLetter=(string)=> {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    useEffect(async () => {
        props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.api}&page=1&pageSize=${props.pageSize}`;
        setLoading(true);
        let data = await fetch(url);
        props.setProgress(40);
        let parseData = await data.json();
        props.setProgress(70);
        setArticles(parseData.articles)
        setTotalResults(parseData.totalResults)
        setLoading(false)
        props.setProgress(100);
    }, [])

    // const componentDidMount = async ()=> {
    //     props.setProgress(10);
    //     let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.api}&page=1&pageSize=${props.pageSize}`;
    //     setLoading(true);
    //     let data = await fetch(url);
    //     props.setProgress(40);
    //     let parseData = await data.json();
    //     props.setProgress(70);
    //     setArticles(parseData.articles)
    //     setTotalResults(parseData.totalResults)
    //     setLoading(false)
    //     props.setProgress(100);
    // }

    // handleOnNext = async()=>{
    //     let url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=cd303febe4644e0e8754c92b53b80e06&page=${this.state.page + 1}&pageSize=${props.pageSize}`;
    //     this.state.loading = true
    //     let data = await fetch(url);
    //     let parseData = await data.json();
    //     this.setState({
    //           page : this.state.page + 1,
    //           articles : parseData.articles,
    //           loading : false
    //     })
    // }

    // handleOnPre = async()=>{
    //       let url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=cd303febe4644e0e8754c92b53b80e06&page=${this.state.page-1}&pageSize=${props.pageSize}`;
    //        this.state.loading = true
    //        let data = await fetch(url);
    //       let parseData = await data.json();
    //       this.setState({
    //             page : this.state.page - 1,
    //             articles : parseData.articles,
    //             loading : false
    //       })
    // }

    const fetchMoreData = async () => {
        setPage(page + 1)
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.api}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true)
        let data = await fetch(url);
        let parseData = await data.json();
        setArticles(articles.concat(parseData.articles))
        setTotalResults(parseData.totalResults)
        setLoading(false)
    }

        return (
            <div className="container my-5">
                <h2 className="text-center my-4 "  >NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines</h2>
                {loading && <Loader />}
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    loader={<Loader />}
                >
                    <div className="container">
                        <div className="row">
                            {
                                articles.map((elements) => {
                                    return (<div className="col-md-4" key={elements.url}>
                                        <NewsItem title={elements.title ? elements.title.slice(0, 45) : ""}
                                            source={elements.source.name}
                                            description={elements.description ? elements.description.slice(0, 88) : ""}
                                            imageurl={elements.urlToImage ? elements.urlToImage : "https://images.financialexpress.com/2021/10/Stocks-REUT-3.jpg"}
                                            url={elements.url}
                                            author={elements.author ? elements.author : "UnKnown"}
                                            time={elements.publishedAt} />
                                    </div>)
                                })
                            }
                        </div>
                    </div>
                </InfiniteScroll>
                {/* {!this.state.loading && <div className = "container d-flex justify-content-between my-5">
                    <button disabled = {this.state.page<=1} type="button" className="btn btn-dark btn-lg " onClick = {this.handleOnPre}>&larr; Previous</button>
                    <button  disabled= {this.state.page + 1 > Math.ceil(this.state.totalResults/props.pageSize)} type="button" className="btn btn-dark btn-lg"
                     onClick = {this.handleOnNext}>Next &rarr;</button>
                </div>} */}
            </div>
        )
}

News.defaultProps = {
    country: 'in',
    pageSize: 5,
    category: 'general'
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}

export default News