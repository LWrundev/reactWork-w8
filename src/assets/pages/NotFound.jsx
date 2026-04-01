import { Link } from "react-router-dom"

export default function(){
    return <>
    <section className="container py-5">
        <img src="./notfound-img.png" alt="notfound-img"
            className="img-fluid" />
        <div className="text-center py-4">
            <h1 className="">
                您所查找的頁面不存在
            </h1>
            <p>
                可能是網址錯誤，或是商品已下架，<br />
                又或者是…<b>已經成為貓貓狗狗的飼料了</b>
            </p>
            <Link to="/"
                className="btn btn-primary">
                總之，我們先回到首頁吧！
            </Link>
        </div>
    </section>
    </>
}