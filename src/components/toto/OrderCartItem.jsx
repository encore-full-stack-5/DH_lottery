import "./OrderCartItem.css";

const OrderCartItem = (props) => {
    const removeBetting = () => {
        const betting = {
            gameId: props.gameId,
            state: 0
        };
        props.removeBetting(betting)
    }

    return (
        <div className="order-box-cart-item">
            <div style={{flex:"1"}}>{props.gameId}</div>
            <div style={{flex:"3"}}>{props.team}</div>
            <div style={{flex:"1"}}>{props.rtp}</div>
            <div style={{flex:"0.5"}}>
                <div 
                    style={{width:"15px", height:"15px", background: "url('https://www.betman.co.kr/images/btn_close_7x7px.png') no-repeat center 3px"}}
                    onClick={removeBetting}
                />
            </div>
        </div>
    );
};

export default OrderCartItem;