import '../styles/Garden.scss';

export function Garden(props) {
  const plants = props.plants;
  return (
    <div>
      {plants.map((item) => {
        return <div>{`${item.plant}: ${item.count}`}</div>
      })}
    </div>
  )
}