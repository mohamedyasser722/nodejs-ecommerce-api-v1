// responseFormatter.js

const formatResponse = (result) => {
    return {
        currentPage: result.page,
        totalPages: result.totalPages,
        totalItems: result.totalDocs,
        hasNext: result.hasNextPage,
        hasPrev: result.hasPrevPage,
        data: result.docs // The actual data
    };
};

module.exports = formatResponse;