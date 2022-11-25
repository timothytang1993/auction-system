import AxiosPost from "../tool/AxiosTool";

function BidItem({ data }: any) {
  function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const productId = (e.target as HTMLButtonElement).id;
    console.log(productId);
    AxiosPost(BackEndUrl(), {
      token:
        "eyJhbGciOiJSUzI1NiIsImtpZCI6IjcxM2ZkNjhjOTY2ZTI5MzgwOTgxZWRjMDE2NGEyZjZjMDZjNTcwMmEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiNDMyMTQ1NDQ0MDAzLWN2MmR0OG9rY2lxbjNnamN1bzhkbDViaDBvZ2s0Z3QzLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiNDMyMTQ1NDQ0MDAzLWN2MmR0OG9rY2lxbjNnamN1bzhkbDViaDBvZ2s0Z3QzLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTE3NzY1NTA3NzkwNjg2NjcyNzgzIiwiZW1haWwiOiJ0aW0xOTkzMjAwMkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6IlB5czdMcVV2WXptbDdlOGpXWkhQYVEiLCJuYW1lIjoi5a6J5bCRIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FMbTV3dTNQcHVSTHEtUVh6d2t3ckNKQU5HbTdLYjJJT04xUHFLZmVvb1N4PXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6IuWwkSIsImZhbWlseV9uYW1lIjoi5a6JIiwibG9jYWxlIjoiemgtVFciLCJpYXQiOjE2NjgzNTQ1NTcsImV4cCI6MTY2ODM1ODE1NywianRpIjoiOTcwYWRkMDliMTVlYzFlYmRkM2JjYWFkYTdlYzM2YjJjMTMzZTZjYyJ9.qOdAqkJXqax6tidiyt03JHKjLwXmeG0EW281hECWYJStg8naLawPVzn4jVsAwRvhzsaBV2_8NAdfzqEr2kg3UaH7sObHAMkbvd0PyvbPc-NURW9P9Tgt2gWXvxq9vf4ePYMimMvOeLJBEvItIzc-E8pjJ6w8m1xaErScthJZ0tUQxk5hWuukgbEP1fqJfQ6tX8Dugaim_ZK6KOdchsqXE-kuZZguJDR6sjrNW1sikwzXp9gavOqdxqQCJJlQ84wvIfBgl-44x9S_0Eezp54HM-LZOgFPPj6iyj6Ns49LJmkqYO604Hh4JRb-6jDfow5gzl2aVyq9Wc3wMkLGy-QmAw",
      productId: productId,
      bidPrice: (
        document.getElementById(`bid-${productId}`) as HTMLInputElement
      ).value,
    }).then((res) => {
      if (res.data.code === "S000") {
        console.log("success order bid");
        // navigate("/bid");
      } else {
        console.log("fail order bid");
        // navigate("/error");
      }
    });
    console.log(
      "this is:" +
        (document.getElementById(`bid-${productId}`) as HTMLInputElement).value
    );
  }

  return (
    <tr>
      <td>{data.id}</td>
      <td>{data.name}</td>
      <td>
        <img src={data.imagePath} alt="" />
      </td>
      <td>HKD {data.bidPrice}</td>
      <td>
        <input
          id={`bid-${data.id}`}
          type="number"
          min="0.1"
          step="0.1"
          defaultValue={data.bidPrice}
        />
      </td>
      <td>
        <button
          id={data.id}
          onClick={(e) => {
            handleClick(e);
          }}
        >
          I want to bid now!!
        </button>
      </td>
    </tr>
  );
}

export default BidItem;
function BackEndUrl(): string {
  throw new Error("Function not implemented.");
}
