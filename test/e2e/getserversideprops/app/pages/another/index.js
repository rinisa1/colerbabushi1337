import Link from 'next/link'
import path from 'path'
import fs from 'fs'

export async function getServerSideProps() {
  const text = fs
    .readFileSync(path.join(process.cwd(), 'world.txt'), 'utf8')
    .trim()

  return {
    props: {
      world: text,
      time: new Date().getTime(),
    },
  }
}

export default ({ world, time }) => (
  <>
    <p>hello {world}</p>
    <span id="anotherTime">time: {time}</span>
    <Link href="/">
      <a id="home">to home</a>
    </Link>
    <br />
    <Link href="/something">
      <a id="something">to something</a>
    </Link>
  </>
)
