import React, { Component } from 'react'

const NewsItem = (props)=>{
        let {title, description,imageurl,url,author,time,source} = props;
        return (
            <div>
                <div className="card my-4" style = {{width: "22rem"}}>
                    <img src={imageurl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}...<span className="badge bg-danger">{source}</span></h5>
                        <p className="card-text">{description}...</p>
                        <p className="card-text"><small className="text-muted">By {author} on {(new Date(time)).toGMTString()}</small></p>
                        <a rel="noreferrer" href={url} target="_blank"
                         className="btn btn-sm btn-primary">Read More</a>
                    </div>
                    </div>
            </div>
        )
}

export default NewsItem