UPDATE dbo.Libri
	SET [Title] = @Title,
		[Author] = @Author,
		[Price] = @Price,
		[Genre] = @Genre,
		[Publish_Year] = @Publish_year,
		[Publisher] = @Publisher,
		[Description] = @Description
WHERE [Id] = @Id;