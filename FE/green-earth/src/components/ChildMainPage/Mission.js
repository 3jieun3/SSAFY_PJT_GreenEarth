import React, { Component } from "react";
import "../../style/ChildMainPage/Mission.css";

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import {
  memberInfoState,
  childInfoState,
  todayMissionListState,
  missionInfoState,
} from "../../store/atoms";
import { useAuthCallback } from "./../../functions/useAuthCallback";
import { useMissionCallback } from "./../../functions/useMissionCallback";

const TodayMissionComponent = () => {
  const navigate = useNavigate();
  const [memberInfo, setMemberInfo] = useRecoilState(memberInfoState);
  const { memberInfoCallback } = useAuthCallback();

  // 오늘의 미션
  const [todayMissionList, setTodayMissionList] = useRecoilState(
    todayMissionListState
  );
  const { todayMissionListCallback } = useMissionCallback();

  // 현재 회원의 미션 목록 Axios 요청
  useEffect(() => {
    memberInfoCallback();
    todayMissionListCallback(memberInfo.childId);
    // console.log(todayMissionList)
  }, []);

  // onclick 파라미터 전달
  const handleClickMissionInfo1 = () => {
    navigate(`/mission/${todayMissionList[0]["mission"]["id"]}`, {
      state: { value: todayMissionList[0]["id"] },
    });
  };
  const handleClickMissionInfo2 = () => {
    navigate(`/mission/${todayMissionList[1]["mission"]["id"]}`, {
      state: { value: todayMissionList[1]["id"] },
    });
  };
  const handleClickMissionInfo3 = () => {
    navigate(`/mission/${todayMissionList[2]["mission"]["id"]}`, {
      state: { value: todayMissionList[2]["id"] },
    });
  };

  return (
    <div className="Missions">
      <div className="Title">MISSION</div>
      <div className="Mission1">
        <div className="mission1" onClick={handleClickMissionInfo1}>
          {todayMissionList[0] && !todayMissionList[0]["clearedAt"] && (
            <h1>{todayMissionList[0].mission.name}</h1>
          )}
        </div>
        <div className="mission2" onClick={handleClickMissionInfo2}>
          {todayMissionList[1] && !todayMissionList[1]["clearedAt"] && (
            <h1>{todayMissionList[1].mission.name}</h1>
          )}
        </div>
        <div className="mission3" onClick={handleClickMissionInfo3}>
          {todayMissionList[2] && !todayMissionList[2]["clearedAt"] && (
            <h1>{todayMissionList[2].mission.name}</h1>
          )}
        </div>
      </div>
      <div className="Mission2">
        <div className="mission1" onclick={handleClickMissionInfo1}>
          {todayMissionList[0] && todayMissionList[0]["clearedAt"] && (
            <h1>{todayMissionList[0].mission.name}</h1>
          )}
        </div>
        <div className="mission2" onclick={handleClickMissionInfo2}>
          {todayMissionList[1] && todayMissionList[1]["clearedAt"] && (
            <h1>{todayMissionList[1].mission.name}</h1>
          )}
        </div>
        <div className="mission3" onclick={handleClickMissionInfo3}>
          {todayMissionList[2] && todayMissionList[2]["clearedAt"] && (
            <h1>{todayMissionList[2].mission.name}</h1>
          )}
        </div>
      </div>
      <div className="Mission3">
        {todayMissionList.length === 0 && <h1>오늘의 임무가 없습니다</h1>}
      </div>
    </div>
  );
};

export default TodayMissionComponent;
