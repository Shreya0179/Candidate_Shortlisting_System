import {

    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer

} from "recharts";


function MatchChart({ results }) {

    return (

        <div
            style={{
                width: "100%",
                height: 400,
                marginTop: "40px"
            }}
        >

            <h2>Match Score Graph</h2>

            <ResponsiveContainer>

                <BarChart data={results}>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="name" />

                    <YAxis />

                    <Tooltip />

                    <Bar
                        dataKey="matchScore"
                        fill="#000"
                    />

                </BarChart>

            </ResponsiveContainer>

        </div>

    );

}

export default MatchChart;