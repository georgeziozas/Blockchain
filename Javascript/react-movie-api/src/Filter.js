import PropTypes from "prop-types";

export function Filter({ setFilter, Filter }) {
  return (
    <label>
      Filter Movies <br />
      <input onChange={(e) => setFilter(e.target.value)} value={Filter} />
    </label>
  );
}

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
};
