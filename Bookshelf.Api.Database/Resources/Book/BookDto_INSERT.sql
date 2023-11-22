INSERT INTO dbo.Libri
           ([Title],
	        [Author],
	        [Price],
	        [Genre],
	        [Publish_Year],
	        [Publisher],
	        [Description]
           )
     VALUES
           (
			@Title,
	        @Author,
	        @Price,
	        @Genre,
	        @Publish_year,
	        @Publisher,
	        @Description
           );

SELECT CAST(SCOPE_IDENTITY() as bigint);
