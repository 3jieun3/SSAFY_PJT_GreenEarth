import { useState } from "react";

import { ChildInfoState } from "../../store/atoms";

const RewardModal = ({ setModalOpen, childInfo }) => {
  const [rewardGoal, setRewardGoal] = useState(
    parseInt(childInfo.clearedMission) + 10
  );
  const [rewardGift, setRewardGift] = useState("에어팟");
  const [mission, setMission] = useState(childInfo.clearedMission);

  const handleClickRewardGoal = (e) => {
    setRewardGoal(e.target.value);
  };

  const handleClickRewardGift = (e) => {
    setRewardGift(e.target.value);
  };

  const handleClickRewardSubmit = () => {
    if (window.confirm("보상을 설정하시겠습니까?")) {
      setModalOpen(false);
    }
  };

  return (
    <>
      <div className="ReawardModal">
        <div className="ReawardModalBody">
          <div className="ReawardModalContent">
            <div>
              <div className="ReawardModalTitle">보상 설정</div>
              <div className="ReawardModalHeader">
                <div className="flex flex-col">
                  <div className="ChildImage">
                    <img src="./../assets/images/girl1.svg" />
                  </div>
                  <div className="text-center text-xl text-blackBrown">
                    Lv.{childInfo.earthLevel} {childInfo.nickName}
                  </div>
                </div>

                <div className="ReawardModalInfo">
                  <div className="text-3xl text-darkBrown">
                    지금까지 {mission}개의 미션을 수행했습니다.
                  </div>
                  {true ? (
                    <div className="text-2xl text-darkBrown mt-6">
                      <div>총 22개의 미션을 달성하면,</div>
                      <div className="text-center mt-2">
                        보상으로 에어팟이 제공 됩니다.
                      </div>
                    </div>
                  ) : (
                    <div className="text-2xl text-darkBrown mt-5">
                      <div>보상이 설정되어 있지 않습니다.</div>
                    </div>
                  )}
                </div>
              </div>
              <hr />
              <div className="ReawardModalSetting">
                <div className="ReawardModalSettingSection">
                  <div className="text-2xl text-blackBrown">
                    보상 기준 설정 :{" "}
                  </div>
                  <input
                    type="number"
                    value={rewardGoal}
                    step="10"
                    min={parseInt(mission) + 10}
                    onChange={handleClickRewardGoal}
                    className="ReawardModalInput"
                  />
                  <div className="text-lg text-blackBrown">
                    ( 최소 {parseInt(mission) + 10}개부터 10개 단위로 설정
                    가능합니다. )
                  </div>
                </div>
                <div className="ReawardModalSettingSection">
                  <div className="text-2xl text-blackBrown">
                    보상 내용 설정 :{" "}
                  </div>
                  <input
                    type="text"
                    value={rewardGift}
                    onChange={handleClickRewardGift}
                    className="ReawardModalInputGift"
                  />
                  <div className="text-lg text-blackBrown">
                    ( 우리 아이에게 따뜻한 마음을 전해보세요. )
                  </div>
                </div>
              </div>
              <hr />
            </div>
            <div className="mt-16">
              <button
                className="ReawardModalButtonClose"
                onClick={() => setModalOpen(false)}
              >
                닫기
              </button>
              <button
                className="ReawardModalButton"
                onClick={handleClickRewardSubmit}
              >
                설정
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RewardModal;
