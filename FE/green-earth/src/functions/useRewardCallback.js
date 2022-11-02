import { useRecoilState } from "recoil";
import { rewardListState, logInTokenState } from "./../store/atoms";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const useRewardCallback = () => {
  const navigate = useNavigate();

  const [logInToken, setLogInToken] = useRecoilState(logInTokenState);
  const [rewardList, setRewardList] = useRecoilState(rewardListState);

  const rewardListCallback = async (childId) => {
    axios({
      method: "get",
      url: `/api/reward/child/${childId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${logInToken}`,
      },
    })
      .then((response) => {
        if (response.data) {
          console.log(response.data);
          setRewardList(response.data);
          console.log("rewardList :", rewardList);
          console.log("보상 정보가 조회되었습니다.");
        }
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const rewardSubmitCallback = async (
    rewardName,
    rewardCondition,
    childId,
    parentNickname
  ) => {
    console.log(rewardName, rewardCondition, childId, parentNickname);
    axios({
      method: "post",
      url: `/api/reward/child/${childId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${logInToken}`,
      },
      data: {
        rewardName: rewardName,
        rewardCondition: rewardCondition,
        childId: childId,
        parentNickname: parentNickname,
      },
    })
      .then((response) => {
        if (response.data) {
          console.log(response.data);
          console.log("보상이 등록 되었습니다.");
        }
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const rewardPayCallback = async (rewardId) => {
    axios({
      method: "delete",
      url: `/api/reward/${rewardId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${logInToken}`,
      },
    })
      .then((response) => {
        if (response.data) {
          console.log(response.data);
          console.log("보상이 지급되었습니다.");
        }
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  return { rewardListCallback, rewardSubmitCallback, rewardPayCallback };
};
