import React from 'react';
import s from "./Tag.module.scss";

const Tag = ({ tag, removeTag, isList, filterNotesByTag, removeTempTag, isTemporary }) => {

   const filter = (tagName) => {
      filterNotesByTag(tagName)
   }

   const onClickHandler = () => {
      if (isTemporary) {
         removeTempTag(tag.id)
      } else {
         removeTag(tag.id)
      }
   }

   return (
      <div className={isList ? `${s.tag} ${s.list}` : s.tag} onClick={() => isList && filter(tag.name)}>
         <div className={s.tagName}>
            {tag.name}
         </div>
         {!isList && <div className={s.remove} onClick={onClickHandler}></div>}
      </div>
   );
};

export default Tag;