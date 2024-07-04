

interface Props {
    url: string[]
}

const ViewallImage = (props: Props) => {
    console.log(props)

    return (
        <div>

            {props.url.map((data, index) => {
                return (
                    <img
                        src={`/api/cleaning/view?filename=${data}`}
                        key={index}
                    />
                );
            })}
        </div>

    )
}
export default ViewallImage