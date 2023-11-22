SELECT l.id,
	   l.title,
	   l.author,
	   l.price,
	   l.genre,
	   l.publish_year,
	   l.publisher,
	   l.description
FROM dbo.Libri AS l
WHERE l.[id] = @id	   