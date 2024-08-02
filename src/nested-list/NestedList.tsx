import React, { useState, useEffect } from "react";
import { NestedListItem } from "./types";

interface NestedListProps {
  data: NestedListItem[];
  initialExpandedIds?: number[]; // Array of item IDs to expand initially
}

export const NestedList: React.FC<NestedListProps> = ({
  data,
  initialExpandedIds = [],
}) => {
  const [expanded, setExpanded] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    const setInitialExpanded = (
      items: NestedListItem[],
      idsToExpand: number[]
    ): { [key: number]: boolean } => {
      const newExpanded: { [key: number]: boolean } = {};

      const recursivelyExpand = (
        items: NestedListItem[],
        idsToExpand: number[],
        parentExpanded: boolean
      ): boolean => {
        let expandedInCurrentBranch = false;
        items.forEach((item) => {
          if (idsToExpand.includes(item.id)) {
            newExpanded[item.id] = true;
            expandedInCurrentBranch = true;
          }
          if (item.children) {
            const childExpanded = recursivelyExpand(
              item.children,
              idsToExpand,
              newExpanded[item.id] || parentExpanded
            );
            if (childExpanded) {
              newExpanded[item.id] = true;
              expandedInCurrentBranch = true;
            }
          }
        });
        return expandedInCurrentBranch || parentExpanded;
      };

      recursivelyExpand(items, idsToExpand, false);
      return newExpanded;
    };

    setExpanded(setInitialExpanded(data, initialExpandedIds));
  }, [data, initialExpandedIds]); // Adding dependencies here

  const handleToggle = (id: number) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [id]: !prevExpanded[id],
    }));
  };

  const handleExpandAll = () => {
    const expandAll = (items: NestedListItem[], expand: boolean) => {
      const newExpanded: { [key: number]: boolean } = {};
      const recursivelyExpand = (items: NestedListItem[]) => {
        items.forEach((item) => {
          newExpanded[item.id] = expand;
          if (item.children) {
            recursivelyExpand(item.children);
          }
        });
      };
      recursivelyExpand(items);
      setExpanded(newExpanded);
    };

    // Determine whether to expand or collapse all based on the current state
    const allExpanded = Object.values(expanded).every((v) => v);
    expandAll(data, !allExpanded);
  };

  const renderList = (items: NestedListItem[]) => {
    return (
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <div onClick={() => handleToggle(item.id)}>
              {item.title} = {item.id}
              {item.children && (
                <span style={{ marginLeft: "50px" }}>
                  {expanded[item.id] ? "-" : "+"}
                </span>
              )}
            </div>
            {item.children && expanded[item.id] && renderList(item.children)}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <button onClick={handleExpandAll}>Expand/Collapse All</button>
      {renderList(data)}
    </div>
  );
};
