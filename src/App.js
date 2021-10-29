import "./App.css"
import { useEffect, useState } from "react"
import axios from "axios"

const baseUrl = "https://developers.ria.com/auto/"
const apiRia = "2WXq0CMtAtMm2dJSXzSHEyj0JpnTgplERjxpw00E"

function App() {
    const [typeAutoBodySelect, setTypeAutoBodySelect] = useState(null)
    const [typeAutoSelect, setTypeAutoSelect] = useState(0)
    const [markSelect, setMarkSelect] = useState(null)
    const [modelSelect, setModelSelect] = useState(null)
    const [yearlSelect, setYearlSelect] = useState(null)
    const [engine, setEngine] = useState(null)

    const [typeAuto, setTypeAuto] = useState([
        { name: "Виберіть тип авто", value: null },
    ])
    const [typeAutoBody, setTypeAutoBody] = useState([])
    const [marks, setMarks] = useState([])
    const [models, setModels] = useState([])
    const [price, setPrice] = useState(null)
    const [raceInt, setRaceInt] = useState(null)

    const [years, setYears] = useState([
        1970, 1971, 1972, 1973, 1974, 1975, 1976, 1977, 1978, 1979, 1980, 1981,
        1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993,
        1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005,
        2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017,
        2018, 2019, 2020, 2021,
    ])

    const changeHandler = (e) => {
        // console.dir(e.target)
        setTypeAutoSelect(e.target.value)
    }

    const getType = async () => {
        try {
            const res = await axios.get(
                `${baseUrl}categories/?api_key=${apiRia}`
            )
            return setTypeAuto(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const getTypeBody = async () => {
        try {
            const res = await axios.get(
                `${baseUrl}categories/${typeAutoSelect}/bodystyles?api_key=${apiRia}`
            )

            return setTypeAutoBody(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const getMarks = async () => {
        try {
            const res = await axios.get(
                `${baseUrl}categories/${typeAutoSelect}/marks?api_key=${apiRia}`
            )

            return setMarks(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const getModel = async () => {
        try {
            const res = await axios.get(
                `${baseUrl}categories/${typeAutoSelect}/marks/${markSelect}/models?api_key=${apiRia}`
            )

            return setModels(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const getPrice = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.get(
                `${baseUrl}average_price?api_key=${apiRia}&marka_id=${markSelect}&model_id=${modelSelect}&yers=${yearlSelect}&engineVolumeFrom=${engine}&engineVolumeTo=${engine}&raceInt=${0}&raceInt=${raceInt}`
            )
            return setPrice(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getType()
        // getTypeBody()

        if (typeAutoSelect == 0) {
            setMarks([])
        }
        if (typeAutoSelect != 0) {
            getMarks()
        }
        if (markSelect) {
            getModel()
        }
    }, [typeAutoSelect, markSelect])

    return (
        <div className="App">
            <form
                method="submit"
                onSubmit={(e) => getPrice(e)}
                className="form"
            >
                <select onChange={(e) => changeHandler(e)} id="type">
                    <option key={0} value={0}>
                        {"Виберіть тип авто"}
                    </option>
                    {typeAuto.map((el) => (
                        <option key={el.value} value={el.value}>
                            {el.name}
                        </option>
                    ))}
                </select>

                {/* <div>
                <select onChange={(e) => setTypeAutoBodySelect(e.target.value)}>
                    <option>Виберіть тип кузова</option>
                    {typeAutoBody.map((el) => (
                        <option key={el.value} value={el.value}>
                            {el.name}
                        </option>
                    ))}
                </select>
            </div> */}

                <select
                    onChange={(e) => setMarkSelect(e.target.value)}
                    id="mark"
                >
                    <option value={null}>Виберіть марку авто</option>
                    {marks.map((el) => (
                        <option key={el.value} value={el.value}>
                            {el.name}
                        </option>
                    ))}
                </select>

                <select
                    onChange={(e) => setModelSelect(e.target.value)}
                    id="model"
                >
                    <option value={null}>Виберіть модель авто</option>
                    {models.map((el) => (
                        <option key={el.value} value={el.value}>
                            {el.name}
                        </option>
                    ))}
                </select>

                <select
                    onChange={(e) => setYearlSelect(e.target.value)}
                    id="year"
                >
                    <option value={null}>Виберіть рік випуску авто</option>
                    {years.map((el) => (
                        <option key={el} value={el}>
                            {el}
                        </option>
                    ))}
                </select>

                <input
                    id="engine"
                    type="number"
                    step="any"
                    placeholder="обєм двигуна"
                    onChange={(e) => {
                        setEngine(Number(e.target.value))
                    }}
                />

                <input
                    id="race"
                    type="number"
                    step="any"
                    placeholder="Пробіг в тис.км"
                    onChange={(e) => {
                        setRaceInt(Number(e.target.value))
                    }}
                />

                <button>Отримати ціну</button>
            </form>
            {price && (
                <p className="price">
                    {Number(price.arithmeticMean).toFixed(2)} ${" "}
                    <span>Середня ціна на ринку</span>
                </p>
            )}
        </div>
    )
}

export default App
