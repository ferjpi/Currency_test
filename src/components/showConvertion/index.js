import Wrapper from "../wrapper";

function ShowConvertion({ loading, error, data }) {
  return (
    <Wrapper loading={loading} error={error} data={data}>
      <div>
        <p>
          The currency convertion from {data?.request?.from} to{" "}
          {data?.request?.to} is:{" "}
        </p>
        <br />
        <p>
          <strong>{data?.response}</strong>
        </p>
      </div>
    </Wrapper>
  );
}

export default ShowConvertion;
