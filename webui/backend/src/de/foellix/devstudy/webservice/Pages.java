package de.foellix.devstudy.webservice;

public class Pages {
	private static final String ERROR_NEEDLE = "%ERROR%";
	private static final String ERROR = "<html lang=\"en\">\n\t<head>\n\t\t<meta charset=\"utf-8\">\n\t\t<title>DevStudy: Error</title>\n\t</head>\n\t<body style=\"background: #CCCCCC; font-family: Tahoma; font-size: 12px;\">\n\t\t<div style=\"background: #151515; color: #FFFFFF; position: relative; top: 50px; width: 350px; margin: 0 auto; padding: 25px; text-align: center; border-radius: 25px;\">\n\t\t\t<img src=\"https://foellix.de/images/fx.png\" alt=\"AQL-Logo\" width=\"200\" />\n\t\t\t<h1>DevStudy</h1>\n\t\t\t<font color=\"#990000\"><strong>Error:</strong></font> "
			+ ERROR_NEEDLE + "\n\t\t</div>\n\t</body>\n</html>";
	private static final String STATS_NEEDLE = "%STATS1%";
	private static final String INDEX = "<html lang=\"en\">\n\t<head>\n\t\t<meta charset=\"utf-8\">\n\t\t<title>DevStudy</title>\n\t</head>\n\t<body style=\"background: #CCCCCC; font-family: Tahoma; font-size: 12px;\">\n\t\t<div style=\"background: #151515; color: #FFFFFF; position: relative; top: 50px; width: 350px; margin: 0 auto; padding: 25px; text-align: center; border-radius: 25px;\">\n\t\t\t<img src=\"https://foellix.de/images/fx.png\" alt=\"AQL-Logo\" width=\"200\" />\n\t\t\t<h1>DevStudy</h1>\n\t\t\t"
			+ STATS_NEEDLE + "\n\t\t\t</div>\n\t</body>\n</html>";

	public static String getIndex() {
		return INDEX.replace(STATS_NEEDLE, "No statistics available!");
	}

	public static String getError(String errorMsg) {
		return ERROR.replace(ERROR_NEEDLE, errorMsg);
	}
}