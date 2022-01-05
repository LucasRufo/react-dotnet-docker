import { GetStaticProps } from "next"
import { useEffect, useState } from "react";

type Props = {
  id: number;
  date: Date;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

const Home = () => {
  const [data, setData] = useState<Props[]>([]);

  console.log(process.env.NEXT_PUBLIC_API_URL as string);

  useEffect(() => {
    async function getData() {
      const json = await fetch(process.env.NEXT_PUBLIC_API_URL as string);
      const data = await json.json();

      setData(data);
    }

    getData();
  }, [])

  return (
    <div>
      {data ?
        data.map(item => (
          <div key={item.id}>
            <p>{item.date}</p>
            <p>{item.temperatureC}</p>
            <p>{item.temperatureF}</p>
            <p>{item.summary}</p>
            <hr />
          </div>
        ))
        : <div>Loading...</div>}
    </div>
  )
}

export default Home
