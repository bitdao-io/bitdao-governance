import axios from "axios";

const getDelegateDetail = async (address:string) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_SNAPSHOT_API}`,
        {
          query: `
          query Votes {
            votes (
              first: 1000
              skip: 0
              where: {
                space: "bitdao.eth"
                voter: "${address}"
              }
              orderBy: "created",
              orderDirection: desc
            ) {
              id
              voter
              ipfs
              metadata
              __typename
              created
              proposal {
                id
                type
                ipfs
                created
                link
                title
                state
                snapshot
                      author
                choices
                __typename
                strategies {params name __typename}
              }
              choice
              space {
                id
                avatar
                members
                email
                domain
                location
                filters {
                  minScore
                  onlyMembers
                }
              }
              metadata
            }
          }
              `,
        }
      );
    //   const allDelegators = data.data.delegates.filter(
    //     (b: any) => b.delegatedVotes !== 0
    //   );
     return data.data.votes;
    //   return allDelegators;
    } catch (error: any) {
      

      console.log(error.message);
      return [];
    }
  };

export default getDelegateDetail;
