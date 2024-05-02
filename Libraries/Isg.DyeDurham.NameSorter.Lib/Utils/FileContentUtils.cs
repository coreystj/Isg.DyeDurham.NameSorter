using Isg.DyeDurham.NameSorter.Lib.DataTypes;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace Isg.DyeDurham.NameSorter.Lib.Utils
{
    public static class FileContentUtils
    {
        public static bool TryReadLines(string rawContent, 
            out string[] lines, out Exception? resonException)
        {
			try
			{
                resonException = null;
                lines = rawContent.Split(
                    new[] { Constants.RETURN_STANDARD, "\n" }, StringSplitOptions.RemoveEmptyEntries);
                return lines != null;
            }
			catch (Exception ex)
			{
                resonException = ex;
                lines = new string[0];
                return false;
			}
        }
    }
}
