import React from "react";
import {
  MobileTwoTone,
  CarTwoTone,
  BugTwoTone,
  EditTwoTone,
  DashboardTwoTone,
  SkinTwoTone,
} from "@ant-design/icons";

const CategorySelection = () => {
  return (
    <div className="categoryMail">
      <div>
        <h1>All categories</h1>
      </div>

      <div className="CategoryOption">
        <div>
          <div className="categoryIcon">
            <MobileTwoTone />
          </div>
          <div className="categoryName">
            <p>Mobiles</p>
          </div>
        </div>
        <div>
          <div className="categoryIcon">
            <CarTwoTone />
          </div>
          <div className="categoryName">
            <p>Vehicles</p>
          </div>
        </div>

        <div>
          <div className="categoryIcon">
            <BugTwoTone />
          </div>
          <div className="categoryName">
            <p>Animals</p>
          </div>
        </div>
        <div>
          <div className="categoryIcon">
            <EditTwoTone />
          </div>
          <div className="categoryName">
            <p>Books</p>
          </div>
        </div>
        <div>
          <div className="categoryIcon">
            <DashboardTwoTone />
          </div>
          <div className="categoryName">
            <p>Sports</p>
          </div>
        </div>
        <div>
          <div className="categoryIcon">
            <SkinTwoTone />
          </div>
          <div className="categoryName">
            <p>Dress</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategorySelection;
