-- Store trip image metadata on Trip as JSONB; remove TripImage table.

ALTER TABLE "Trip" ADD COLUMN "images" JSONB NOT NULL DEFAULT '[]'::jsonb;

UPDATE "Trip" AS t
SET "images" = agg.payload
FROM (
  SELECT
    "tripId",
    json_agg(img_row ORDER BY "sortOrder", "createdAt") AS payload
  FROM (
    SELECT
      "tripId",
      "sortOrder",
      "createdAt",
      json_strip_nulls(
        json_build_object(
          'originalName', "originalName",
          'size', "size",
          'mimeType', "mimeType",
          'objectKey', "objectKey",
          'sortOrder', "sortOrder"
        )
      ) AS img_row
    FROM "TripImage"
  ) AS img_rows
  GROUP BY "tripId"
) AS agg
WHERE t.id = agg."tripId";

DROP TABLE "TripImage";
