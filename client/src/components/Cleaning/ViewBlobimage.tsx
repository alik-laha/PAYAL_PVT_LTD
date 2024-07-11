const BlobImageDisplay = ({ blob }: { blob: string[] }) => {

    return (
        <div>
            <div className="flex">
                {blob.map((url: string, index: number) => (
                    <img key={index} src={url} alt={`Blob ${index}`} style={{ width: '70px', height: '70px', margin: '5px' }} />
                ))}
            </div>
        </div>
    )
}
export default BlobImageDisplay