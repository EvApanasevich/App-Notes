import React from 'react';
import Input from "../UI/input/Input";
import Select from "../UI/select/Select";
import s from "./NoteFilter.module.scss";

const NoteFilter = ({ filter, setFilter }) => {
   return (
      <div>
         <Input
            placeholder={'searching...'}
            value={filter.query}
            onChange={e => setFilter({ ...filter, query: e.currentTarget.value })}
         />

         <Select
            value={filter.sort}
            onChange={selectedSort => setFilter({ ...filter, sort: selectedSort })}
            defaultValue={'sort:'}
            options={[
               { value: 'title', name: 'sort for title' },
               { value: 'body', name: 'sort for body' },
            ]}
         />
      </div>
   );
};

export default NoteFilter;