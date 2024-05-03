/*
 * Summary: This engine sorts names and generates a raw file output of the resulting sort.
 * Date: 2024-05-02
 * Author: Corey St-Jacques
 * 
 */


using Isg.DyeDurham.NameSorter.Lib.Comparers;
using Isg.DyeDurham.NameSorter.Lib.Models;
using Isg.DyeDurham.NameSorter.Lib.Utils;
using System;
using System.Linq;

namespace Isg.DyeDurham.NameSorter.Lib.Engines
{
    /// <summary>
    /// This engine sorts names and generates a raw file output of the resulting sort.
    /// </summary>
    public class NameSorterEngine
    {
        /// <summary>
        /// All current input names are stored here.
        /// </summary>
        private readonly Name[] _inputNames;

        /// <summary>
        /// Constructor with parameters.
        /// </summary>
        /// <param name="lines">The names in lines to be sorted.</param>
        public NameSorterEngine(string[] lines)
        {
            string[] temporaryLines = lines ?? throw new ArgumentNullException(nameof(lines));
            _inputNames = temporaryLines.Select(x => 
                NameUtils.Get(x)).ToArray();
        }

        /// <summary>
        /// Invokes the sorting algorythm for the input names.
        /// <summary>
        /// <returns>Returns the generated result.</returns>
        public NameSorterResult Sort()
        {
            Name[] orderedNames = _inputNames.OrderBy(x => x, new NameComparer()).ToArray();

            var result = new NameSorterResult(orderedNames);

            return result;
        }
    }
}
