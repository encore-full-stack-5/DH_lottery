import './EvenOddResult.css'

const EvenOddResult = () => {
    const res = [
        {
            id: 1103,
            data: [1, 2, 3, 4, 5, 6]
        },
        {
            id: 1102,
            data: [11, 13, 16, 33, 34, 45]
        },
        {
            id: 1101,
            data: [12, 14, 15, 17, 18, 19]
        },
        {
            id: 1101,
            data: [12, 14, 15, 17, 18, 19]
        },
        {
            id: 1101,
            data: [12, 14, 15, 17, 18, 19]
        },
        {
            id: 1101,
            data: [12, 14, 15, 17, 18, 19]
        },
        {
            id: 1101,
            data: [12, 14, 15, 17, 18, 19]
        },
        {
            id: 1101,
            data: [12, 14, 15, 17, 18, 19]
        },

    ]

    const setBackkGroundColor = (number) => {
        if(number <= 10) return '#ff5733'
        if(number <= 20) return '#33c1ff'
        if(number <= 30) return '#33ff57'
        if(number <= 40) return '#8a2be2'
        return 'darkgrey'
    }

    const isOdd = (number) => number % 2 !== 0;

    res.map(entry => (entry.data.sort((a, b) => (isOdd(a) === isOdd(b) ? 0 : isOdd(a) ? -1 : 1))));


    return (
        <div className="container">
            <div className="center-content">
                <h1 style={{ marginBottom: "40px"}}>
                    <strong>당첨 통계</strong>
                </h1>
                <div className="cards-container">
                    {res.map((entry) => (
                        <div className="card">
                            <h3 style={{marginTop: '20px', marginRight: '30px'}}>{entry.id} 회차</h3>
                            <div className="balls-container">
                                {entry.data.map((number) => (
                                    <div
                                        key={entry.id}
                                        className={`ball ${isOdd(number) ? "odd" : "even"}`}
                                        style={{ backgroundColor: setBackkGroundColor(number) }}
                                    >
                                        {number}
                                    </div>
                                ))}
                            </div>
                            <p style={{marginLeft: '40px', marginTop: '19px' ,fontSize: '20px'}}>홀수: {entry.data.filter(isOdd).length}개, 짝수: {entry.data.length - entry.data.filter(isOdd).length}개</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default EvenOddResult;